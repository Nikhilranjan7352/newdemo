import PyPDF2

def PDFrotate(origFileName, newFileName, rotation):
    # creating a pdf File object of original pdf
    pdfFileObj = open(origFileName, 'rb')

    # creating a pdf Reader object
    pdfReader = PyPDF2.PdfReader(pdfFileObj)

    # creating a pdf writer object for new pdf
    pdfWriter = PyPDF2.PdfWriter()

    # rotating each page
    print("hey")
    print(len(pdfReader.pages))
    for page in range(len(pdfReader.pages)):
        # creating rotated page object
        pageObj = pdfReader.pages[page]
        # pageObj.rotate(rotation)
        page_text = pageObj.extract_text()
        updated_text = page_text.replace("CERTIFICATE", "OYEOYE")
        print(updated_text)
        content_stream = pageObj.get_contents()
        if content_stream is not None:
            # decode the content stream
            content = content_stream.get_data()

            # perform find-and-replace
            updated_content = content.replace("CERT".encode(),"HYy".encode())

            # encode the updated content back to bytes
            updated_content_bytes = updated_content

            # update the PageObject with the new content stream
            pageObj.merge_page(updated_content_bytes)

        # adding the updated page to the pdf writer
        pdfWriter.add_page(pageObj)
        # updated_page = pageObj.createFromString(updated_text)

        # adding rotated page object to pdf writer
        # pdfWriter.add_page(pageObj)

    # new pdf file object
    newFile = open(newFileName, 'wb')

    # writing rotated pages to new file
    pdfWriter.write(newFile)

    # closing the original pdf file object
    pdfFileObj.close()

    # closing the new pdf file object
    newFile.close()


def main():
    # original pdf file name
    origFileName = 'mycert.pdf'

    # new pdf file name
    newFileName = 'rotated_example.pdf'

    # rotation angle
    rotation = 270

    # calling the PDFrotate function
    PDFrotate(origFileName, newFileName, rotation)


if __name__ == "__main__":
    # calling the main function
    main()
