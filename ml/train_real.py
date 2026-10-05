import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import warnings
warnings.filterwarnings('ignore')

def main():
    print("Loading 5,000 real judgments from Hugging Face...")
    df = pd.read_csv(r"C:\Users\aryaN\NyayaSetu\ml\data\real_data_sample.csv")

    # Clean data (drop empty text/labels)
    df = df.dropna(subset=['text', 'label'])
    
    # Ensure label is treated as a string category
    df['label'] = df['label'].astype(str)

    print(f"Data ready! Found {len(df['label'].unique())} unique legal categories/labels.")
    
    print("Extracting text features using TF-IDF (Learning vocabulary)...")
    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    X = vectorizer.fit_transform(df['text'])
    y = df['label']

    # 80% train, 20% test (1,000 cases strictly for testing)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training ML Model on Real Data...")
    clf = LogisticRegression(max_iter=1000, class_weight='balanced')
    clf.fit(X_train, y_train)

    print("\nEvaluating Model on 1,000 Unseen Test Cases...\n" + "-"*50)
    y_pred = clf.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred) * 100
    print(f"Overall Test Accuracy: {acc:.2f}%\n" + "-"*50)
    
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

if __name__ == "__main__":
    main()
