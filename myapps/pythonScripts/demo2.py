import PyPDF2

def find_and_replace_text(origFileName, newFileName, find_string, replace_string):
    # creating a pdf File object of the original pdf
    pdfFileObj = open(origFileName, 'rb')

    # creating a pdf Reader object
    pdfReader = PyPDF2.PdfReader(pdfFileObj)

    # creating a pdf writer object for the new pdf
    pdfWriter = PyPDF2.PdfWriter()

    # iterating through each page and performing find-and-replace
    for page in range(len(pdfReader.pages)):
        # creating rotated page object
        pageObj = pdfReader.pages[page]

        # Extract the text from the page
        page_text = pageObj.extract_text()

        # Perform find-and-replace on the extracted text
        updated_text = page_text.replace(find_string, replace_string)

        # Get the content stream of the page and update it with the modified text
        content_stream = pageObj.get_contents()
        if content_stream is not None:
            content = content_stream.get_data()
            updated_content = content.replace(find_string.encode(), replace_string.encode())

            # Create a new ContentStream
            new_content_stream = PyPDF2.pdf.ContentStream(updated_content)

            # Update the PageObject with the new content stream
            pageObj[PyPDF2.pdf.PageObject.CONTENTS] = new_content_stream

        # Add the updated page to the pdf writer
        pdfWriter.add_page(pageObj)

    # new pdf file object
    newFile = open(newFileName, 'wb')

    # writing updated and modified pages to the new file
    pdfWriter.write(newFile)

    # closing the original pdf file object
    pdfFileObj.close()

    # closing the new pdf file object
    newFile.close()

def main():
    # original pdf file name
    origFileName = 'mycert.pdf'

    # new pdf file name
    newFileName = 'output_file.pdf'

    # string to find and replace
    find_string = '{name}'
    replace_string = 'OYEOYE'

    # calling the find_and_replace_text function
    find_and_replace_text(origFileName, newFileName, find_string, replace_string)

if __name__ == "__main__":
    # calling the main function
    main()
