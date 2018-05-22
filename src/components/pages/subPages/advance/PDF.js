import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from "numeral";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getCompanyPhoneNo = storeInfo => {
  let phone = [];
  phone.push(" " + storeInfo.number1);
  phone.push(" " + storeInfo.number2);
  phone.push(" " + storeInfo.number3);
  return phone;
};

function GENERATE_PDF(data, date = null) {
  let { name, number, amount, details, storeInfo } = data;
  console.log("====================================");
  console.log("GENERATE_PDF got Date ", date);
  console.log("====================================");
  var docDefinition = {
    content: [
      { text: storeInfo.name, style: "header", alignment: "center" },
      {
        text:
          "For All kinds of - Glass, SS, Pipe, Thai Aluminium, False Celling, Accessories",
        alignment: "center",
        fontSize: 8,
        bold: true,
        margin: [0, -4, 0, 0]
      },
      {
        text: storeInfo.address + " |" + getCompanyPhoneNo(storeInfo),
        fontSize: 10,
        bold: true,
        alignment: "center"
      },
      { text: "\n" },

      {
        text: "Customer Details:\n",
        bold: true,
        fontSize: 10,
        margin: [0, -5, 0, 0]
      },
      {
        fontSize: 10,
        columns: [
          {
            ul: ["Name: " + name + ", Phone: " + number]
          },
          {
            type: "none",
            fontSize: 10,
            margin: [0, -5, 0, 0],
            ul: [
              {
                text: date ? `Date: ${date}` : `Date: ${Date().substr(0, 15)}`,
                alignment: "right"
              }
            ]
          }
        ]
      },

      { text: "\n\n" },
      // Render the fabrication details here
      {
        text:
          "Advance Amount: " +
          numeral(parseFloat(amount)).format("0,0.00") +
          " Taka",
        decoration: "underline",
        bold: true,
        fontSize: 14,
        color: "green",
        alignment: "center"
      },
      {
        text: details,
        bold: true
      },
      { text: "\n" },

      { text: "\n\n" },
      {
        columns: [
          {
            type: "none",
            ul: [
              {
                text: "---------------------------------",
                alignment: "left"
              },
              { text: "Receivers Signature", alignment: "left" }
            ]
          },
          {
            type: "none",
            ul: [
              {
                text: "----------------------------------------",
                alignment: "right"
              },
              { text: "For " + storeInfo.name, alignment: "right" }
            ]
          }
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 25,
        bold: true,
        margin: [0, -20, 0, 3] // [Left, Top, Right, Bottom]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableDesign: {
        fontSize: 8,
        margin: [0, 5, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black"
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };

  //End
  let pdf_name;
  if (date) {
    pdf_name =
      number + "_advance_history_memo_" + name + "_" + Date().substr(0, 15);
  } else {
    pdf_name = number + "_advance_memo_" + name + "_" + Date().substr(0, 15);
  }
  pdfMake.createPdf(docDefinition).download(pdf_name);
}

export default GENERATE_PDF;
