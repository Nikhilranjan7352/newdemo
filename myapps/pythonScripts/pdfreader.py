import PyPDF2

def read_pdf(file_path):
    try:
        # Open the PDF file in binary read mode
        with open(file_path, 'rb') as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)

            # Loop through each page and extract text
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                print(f"Page {page_num + 1}:\n{text}\n")

    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except PyPDF2.utils.PdfReadError:
        print(f"Error reading PDF: {file_path}")

if __name__ == "__main__":
    # Replace 'your_pdf_file.pdf' with the actual path to your PDF file
    pdf_file_path = 'mycert.pdf'
    read_pdf(pdf_file_path)
