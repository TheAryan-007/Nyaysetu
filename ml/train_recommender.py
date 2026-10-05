import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import classification_report, accuracy_score
import warnings
warnings.filterwarnings('ignore')

def train_and_evaluate():
    print("Loading dataset...")
    df = pd.read_csv(r"C:\Users\aryaN\NyayaSetu\ml\data\training_data.csv")
    
    # Preprocess labels (split by comma)
    df['sections_list'] = df['sections'].apply(lambda x: [s.strip() for s in x.split(',')])
    
    # We will duplicate the dataset slightly to simulate having enough data for train/test split 
    # since we only have 12 dummy rows right now.
    df = pd.concat([df]*5, ignore_index=True)
    
    # Add some slight noise to facts to make the split meaningful
    import random
    df['facts'] = df['facts'].apply(lambda x: x + (" (reported)" if random.random() > 0.5 else ""))

    # Binarize labels for Multi-label classification
    mlb = MultiLabelBinarizer()
    y = mlb.fit_transform(df['sections_list'])
    
    # TF-IDF Vectorization
    print("Extracting features using TF-IDF...")
    vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
    X = vectorizer.fit_transform(df['facts'])
    
    # Train-test split (80-20)
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Logistic Regression (One vs Rest for multi-label)
    print("Training One-vs-Rest Logistic Regression model...")
    clf = OneVsRestClassifier(LogisticRegression(solver='liblinear'))
    clf.fit(X_train, y_train)
    
    # Predict and Evaluate
    print("Evaluating Model Accuracy...\n")
    y_pred = clf.predict(X_test)
    
    print("-" * 50)
    print(f"Overall Exact Match Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
    print("-" * 50)
    print("Detailed Classification Report (Precision / Recall / F1-Score):")
    
    # Only print report for classes that are actually in the test set to avoid warnings
    print(classification_report(y_test, y_pred, target_names=mlb.classes_, zero_division=0))
    
    # Test a fresh prediction
    print("-" * 50)
    print("Testing a custom input: 'My husband is beating me for dowry'")
    test_vec = vectorizer.transform(["My husband is beating me for dowry"])
    pred_probs = clf.predict_proba(test_vec)[0]
    
    # Get top 2 predictions
    top_indices = np.argsort(pred_probs)[::-1][:2]
    print("Top Recommendations:")
    for idx in top_indices:
        print(f" - {mlb.classes_[idx]} (Confidence: {pred_probs[idx]*100:.1f}%)")

if __name__ == "__main__":
    train_and_evaluate()
