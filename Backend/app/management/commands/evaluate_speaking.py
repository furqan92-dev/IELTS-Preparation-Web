from django.core.management.base import BaseCommand
from django.db import transaction
from django.db import models  
from app.models import SpeakingEvaluation
from app.speaking_evaluator import IELTSSpeakingEvaluator
import json
import os
from datetime import datetime

class Command(BaseCommand):
    help = 'Evaluate IELTS speaking responses from JSON file and store results'
    
    def add_arguments(self, parser):
        parser.add_argument('input_file', type=str, help='Path to JSON input file')
        parser.add_argument('--part', type=int, choices=[1, 2, 3], required=True,
                        help='Speaking part (1, 2, or 3)')
        parser.add_argument('--overwrite', action='store_true', 
                        help='Overwrite existing evaluations')
    
    def handle(self, *args, **options):
        if not os.path.exists(options['input_file']):
            self.stderr.write(self.style.ERROR(f"File not found: {options['input_file']}"))
            return
        
        evaluator = IELTSSpeakingEvaluator()
        
        try:
            with open(options['input_file']) as f:
                data = json.load(f)
        except json.JSONDecodeError:
            self.stderr.write(self.style.ERROR("Invalid JSON file"))
            return
        
        with transaction.atomic():
            if options['overwrite']:
                SpeakingEvaluation.objects.filter(part=options['part']).delete()
            
            successful = 0
            for response in data.get('responses', []):
                try:
                    evaluation = evaluator.evaluate_response(
                        response['answer'],  
                        {
                            'question': response['question'],
                            'time': 30,  
                            'silence_timeout': 10  
                        }
                    )
                    
                    if 'error' in evaluation:
                        self.stdout.write(self.style.WARNING(
                            f"Skipped {response['question'][:50]}...: {evaluation['error']}"
                        ))
                        continue
                    
                    SpeakingEvaluation.objects.create(
                        question=response['question'],
                        response=response['answer'],
                        fluency=evaluation['fluency'],
                        grammar=evaluation['grammar'],
                        vocabulary=evaluation['vocabulary'],
                        pronunciation=evaluation['pronunciation'],
                        relevance=evaluation['relevance'],
                        overall_band=evaluation['overall_band'],
                        part=options['part']
                    )
                    successful += 1
                    
                except Exception as e:
                    self.stderr.write(self.style.ERROR(
                        f"Failed to evaluate {response.get('question', 'Unknown')}: {str(e)}"
                    ))
                    continue
            
            if successful > 0:
                avg_band = SpeakingEvaluation.objects.filter(part=options['part']).aggregate(
                    avg_band=models.Avg('overall_band')
                )['avg_band']
                self.stdout.write(self.style.SUCCESS(
                    f"Successfully evaluated {successful} responses. Average Band: {avg_band:.1f}"
                ))
            else:
                self.stdout.write(self.style.ERROR("No responses were successfully evaluated"))