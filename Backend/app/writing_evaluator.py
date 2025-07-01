import os
os.environ['BLAH'] = '3'
import spacy
from sentence_transformers import SentenceTransformer as ST
import threading as th
import time as t

class MessyIELTSWritingThing:
    def __init__(self):
        self.nlpthing = spacy.load("en_core_web_sm")
        self.modelthing = ST('all-MiniLM-L6-v2')
        self.answers = {
            1: {"text": "Maps show changes.", "words": 150},
            2: {"text": "Language problems abroad.", "words": 250}
        }

    def check_writing(self, txt, tasknum):
        if not txt.strip():
            return {"oops": "No text!"}
            
        doc = self.nlpthing(txt)
        words = [w for w in doc if not w.is_punct]
        needed = self.answers[tasknum]["words"]
        
        if len(words) < needed:
            return {"oops": f"Need {needed} words"}

        scores = {
            'TA': min(1.0, self._check_task(txt, tasknum, doc)),
            'CC': min(1.0, self._check_flow(doc)),
            'LR': min(1.0, self._check_words(doc)),
            'GRA': min(1.0, self._check_grammar(doc))
        }
        
        bands = {k: self._num_to_band(v) for k, v in scores.items()}
        total = self._calc_total(scores)
        
        return {
            'task': tasknum,
            'words': len(words),
            'bands': bands,
            'total': total,
            'notes': self._get_notes(bands, total)
        }

    def _num_to_band(self, num):
        if num >= 0.9: return 9.0
        elif num >= 0.8: return 8.0
        elif num >= 0.7: return 7.0
        elif num >= 0.6: return 6.0
        elif num >= 0.5: return 5.0
        return 4.0

    def _calc_total(self, scores):
        total = (scores['TA'] * 0.4 + scores['CC'] * 0.25 + 
                scores['LR'] * 0.25 + scores['GRA'] * 0.1)
        return self._num_to_band(total)

    def _get_notes(self, bands, total):
        words = {
            9: "Great", 8: "Good", 7: "OK", 
            6: "Meh", 5: "Bad", 4: "Terrible"
        }
        return {
            'overall': f"{words.get(total, '?')} (Band {total})"
        }