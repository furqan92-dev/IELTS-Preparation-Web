import re as r
import spacy as sp
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer as TF
from sklearn.metrics.pairwise import cosine_similarity as cs
import nltk as n
from nltk.tokenize import word_tokenize as wt

class CrazySpeakingJudge:
    def __init__(self):
        self.nlp = sp.load("en_core_web_sm", disable=["ner"])
        self.nlp.add_pipe('sentencizer')
        self.uh_pattern = r.compile(r"\b(um|uh|hmm)\b", r.IGNORECASE)
        self.qs = {
            "p1": [{"q": "Your name?", "t": 20}],
            "p2": [{"q": "Describe a trip.", "t": 120}],
            "p3": [{"q": "Tech in school?", "t": 45}]
        }
        self.words_needed = {1: 10, 2: 50, 3: 30}

    def judge_speaking(self, text, q_data, part):
        check = self._look_at_text(text, part)
        if not check["ok"]:
            return {"error": check["error"]}
        
        fluency = max(4.0, min(9.0, 9 - check["uhs"] * 0.3))
        grammar = max(4.0, 9 - check["errors"] * 0.7)
        words = min(9.0, 4 + (check["unique"] / max(1, check["total"])) * 3)
        speak = self._check_speech(text)
        
        try:
            tf = TF()
            matrix = tf.fit_transform([q_data["q"], check["text"]])
            similar = cs(matrix[0:1], matrix[1:2])[0][0]
            rel_score = min(9.0, 5 + similar * 4)
        except:
            rel_score = 6.0
        
        return {
            "fluency": self._band(fluency),
            "grammar": self._band(grammar),
            "words": self._band(words),
            "speak": self._band(speak),
            "relevant": self._band(rel_score),
            "text": check["text"]
        }

    def _band(self, num):
        bands = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0]
        return min(bands, key=lambda x: abs(x - round(num * 2) / 2))

    def _look_at_text(self, text, part):
        doc = self.nlp(text)
        words = [t.text for t in doc if t.is_alpha]
        unique = set(w.lower() for w in words)
        needed = self.words_needed.get(part, 10)
        
        if len(words) < needed:
            return {"ok": False, "error": "Too short"}
        if len(unique) < needed/2:
            return {"ok": False, "error": "Repeat words"}
            
        return {
            "ok": True,
            "uhs": len(self.uh_pattern.findall(text.lower())),
            "total": len(words),
            "unique": len(unique),
            "text": text
        }

    def _check_speech(self, text):
        try:
            words = [w for w in wt(text) if w.isalpha()]
            return max(4.0, min(9.0, 9 - len(words) * 0.01))
        except:
            return 6.0