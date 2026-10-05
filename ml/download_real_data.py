import os
import pandas as pd
from datasets import load_dataset

TOKEN = os.environ.get("HF_TOKEN", "")

def main():
    print("Authenticating with Hugging Face and downloading real dataset...")
    try:
        # Load the first 5000 rows to keep development fast but accurate (as per roadmap)
        ds = load_dataset("L-NLProc/NyayaAnumana-Classification-Data", split="train[:5000]", token=TOKEN)
        df = ds.to_pandas()
        
        print(f"\nSUCCESS: Downloaded {len(df)} real judgments!")
        print("Dataset Columns:", list(df.columns))
        
        # Save to disk so we don't have to download it again
        os.makedirs(r"C:\Users\aryaN\NyayaSetu\ml\data", exist_ok=True)
        out_path = r"C:\Users\aryaN\NyayaSetu\ml\data\real_data_sample.csv"
        df.to_csv(out_path, index=False)
        print(f"Data saved to {out_path}")
        
    except Exception as e:
        print(f"\nError downloading dataset: {e}")

if __name__ == "__main__":
    main()
