import PyPDF2

def replace_variable(text, variable, new_value):
    return text.replace(variable, str(new_value))

def read_and_replace_file(input_file_path, output_file_path, variables, new_values):
    if input_file_path.lower().endswith('.pdf'):
        # For PDF files
        pdf_reader = PyPDF2.PdfReader(open(input_file_path, 'rb'))
        num_pages = len(pdf_reader.pages)

            # Loop through each page and extract text
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            print(f"Page {page_num + 1}:\n{text}\n")
        pdf_writer = PyPDF2.PdfWriter()

        # Loop through each page and extract text
        for page_num in range(pdf_reader.pages()):
            page = pdf_reader.getPage(page_num)
            text = page.extract_text()

            # Perform the text replacement
            for variable, new_value in zip(variables, new_values):
                text = replace_variable(text, variable, new_value)

            # Create a new page and add the modified text
            new_page = PyPDF2.pdf.PageObject.createBlankPage(
                width=page.mediaBox.getWidth(),
                height=page.mediaBox.getHeight()
            )
            new_page.mergePage(page)
            new_page.addText(text)

            pdf_writer.addPage(new_page)

        # Save the modified PDF as output2.pdf
        with open(output_file_path, 'wb') as output_file:
            pdf_writer.write(output_file)

        print(f"Modified PDF saved as {output_file_path}")

    else:
        print("Unsupported file format. Only PDF files are supported.")

# Example usage
input_file = 'mycert2.pdf'
output_file = 'output2.pdf'
variables = ['Your Name', 'Your Father\'s Name', 'Designation', 'Date of Joining', 'Current Date', 'Tenure']
new_values = ['Pari Paratha', 'Pari', 'Ceo Manager', '2023-01-01', '2023-06-30', '15 years']

# Call the function with input and output paths for replacement
read_and_replace_file(input_file, output_file, variables, new_values)
