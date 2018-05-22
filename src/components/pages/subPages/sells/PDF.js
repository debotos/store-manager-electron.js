import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import numeral from "numeral";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// it will take an object that contain an array and return an array object of table instance
const renderTables = tables => {
  let { aluminium, glass, ss, others } = tables;

  let aluminiumTables = [];
  let glassTables = [];
  let ssTables = [];
  let othersTables = [];

  if (aluminium) {
    if (aluminium.length > 0) {
      aluminium.forEach(singleAluminiumItem => {
        aluminiumTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", 40, 38, 45, 45, 53, "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderAluminiumContent(singleAluminiumItem)
          }
        });
      });
    }
  }
  if (glass) {
    if (glass.length > 0) {
      glass.forEach(singleGlassItem => {
        glassTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", "*", "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderGlassContent(singleGlassItem)
          }
        });
      });
    }
  }
  if (ss) {
    if (ss.length > 0) {
      ss.forEach(singleSSItem => {
        ssTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", 55, 40, 45, 53, "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderSSContent(singleSSItem)
          }
        });
      });
    }
  }
  if (others) {
    if (others.length > 0) {
      others.forEach(singleOthersItem => {
        othersTables.push({
          style: "tableDesign",
          table: {
            widths: [17, "*", "*", "*", "*"],
            headerRows: 2,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            body: renderOthersContent(singleOthersItem)
          }
        });
      });
    }
  }
  return [aluminiumTables, glassTables, ssTables, othersTables];
};
const getCompanyPhoneNo = storeInfo => {
  let phone = [];
  phone.push(" " + storeInfo.number1);
  phone.push(" " + storeInfo.number2);
  phone.push(" " + storeInfo.number3);
  return phone;
};
const friendlyDiscountRender = customer => {
  if (parseFloat(customer.allTotal.finalFriendlyDiscount, 10) > 0) {
    return ` - ${numeral(
      parseFloat(customer.allTotal.finalFriendlyDiscount)
    ).format("0,0.00")} Taka = ${numeral(
      parseFloat(customer.allTotal.finalTotal)
    ).format("0,0.00")} Taka`;
  } else {
    return "";
  }
};
const renderNewDue = newDue => {
  if (parseInt(newDue, 10) === 0) {
    return " [paid]";
  } else {
    return numeral(parseFloat(newDue)).format("0,0.00") + " Taka";
  }
};
const renderPrevDue = prevDue => {
  if (parseInt(prevDue, 10) === 0) {
    return " [paid]";
  } else {
    return numeral(parseFloat(prevDue)).format("0,0.00") + " Taka";
  }
};
const renderAdvance = customer => {
  let advance = 0;
  if (customer.advance) {
    advance = customer.advance;
  }
  return {
    text:
      "Deposit Now (" +
      numeral(parseFloat(customer.depositNow)).format("0,0.00") +
      ") + Previous Advance (" +
      numeral(parseFloat(advance)).format("0,0.00") +
      ") = " +
      numeral(parseFloat(customer.depositNow) + parseFloat(advance)).format(
        "0,0.00"
      ) +
      " Taka",
    italics: true,
    bold: true,
    color: "green"
  };
};
function GENERATE_PDF(data, date = null) {
  let { tables, customer, memoNumber, storeInfo } = data;

  console.log("====================================");
  console.log("GENERATE_PDF got Date ", date);
  console.log("====================================");
  //Start
  var docDefinition = {
    watermark: {
      text: storeInfo.name,
      color: "blue",
      opacity: 0.2,
      bold: true,
      italics: false
    },
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
        alignment: "center",
        bold: true,
        fontSize: 10
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
            ul: [
              "Name: " + customer.name + ", Phone: " + customer.number,
              customer.mail && "E-mail: " + customer.mail,
              "Address: " + customer.address
            ]
          },
          {
            fontSize: 10,
            margin: [0, -5, 0, 0],
            type: "none",
            ul: [
              {
                text: "Memo No. " + memoNumber,
                italics: true,
                fontSize: 12,
                bold: true,
                alignment: "right"
              },
              {
                text: date ? `Date: ${date}` : `Date: ${Date().substr(0, 15)}`,
                alignment: "right"
              }
            ]
          }
        ]
      },
      // I have to create a function that will render tables
      renderTables(tables)[0], // Aluminium
      renderTables(tables)[1], // Glass
      renderTables(tables)[2], //SS
      renderTables(tables)[3], //Other
      {
        alignment: "right",
        fontSize: 10,
        type: "none",
        ul: [
          {
            text:
              "All Tables Total = " +
              numeral(parseFloat(customer.allTotal.total)).format("0,0.00") +
              " Taka" +
              friendlyDiscountRender(customer),
            italics: true,
            bold: true,
            color: "blue"
          },
          {
            text:
              "Previous Due = " +
              renderPrevDue(customer.prevDue) +
              " | " +
              "All Tables Total With Previous Due = " +
              numeral(parseFloat(customer.totalWithDue)).format("0,0.00") +
              " Taka",
            italics: true,
            bold: true,
            color: "red"
          },
          renderAdvance(customer),
          {
            text: "New Due From Now = " + renderNewDue(customer.newDue),
            italics: true,
            bold: true,
            color: "red"
          }
        ]
      },
      { text: "\n" },
      {
        fontSize: 10,
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
      memoNumber +
      "_" +
      "[" +
      customer.number +
      "]" +
      "sell_history_memo_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  } else {
    pdf_name =
      memoNumber +
      "_" +
      "[" +
      customer.number +
      "]" +
      "sell_memo_" +
      customer.name +
      "_" +
      Date().substr(0, 15);
  }
  pdfMake.createPdf(docDefinition).download(pdf_name);
}

const renderAluminiumContent = sellingItems => {
  let TableHeader = [
    "ID",
    "Item",
    "Company",
    "Length",
    "Dia",
    "Color",
    "Quantity",
    "Rate",
    "Total"
  ];
  let Content = [
    [
      {
        text: "Aluminium Table",
        style: "tableHeader",
        colSpan: 9,
        alignment: "center"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];

  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.companyName,
      singleItem.length,
      singleItem.dia,
      singleItem.color,
      singleItem.quantity,
      numeral(parseFloat(singleItem.rate)).format("0,0.00"),
      numeral(parseFloat(singleItem.total)).format("0,0.00")
    ];
    Content.push(item);
  });
  if (
    parseFloat(sellingItems.attribute.atLastTotalAll) !==
    parseFloat(sellingItems.attribute.allCellTotal)
  ) {
    Content.push([
      {
        text: numeral(parseFloat(sellingItems.attribute.allCellTotal)).format(
          "0,0.00"
        ),
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }

  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    // Do Nothing
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} Now Total = ${numeral(
          parseFloat(sellingItems.attribute.allCellTotal)
        ).format("0,0.00")} - ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} = ${numeral(
          parseFloat(sellingItems.attribute.afterDiscountTotal)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${numeral(
          parseFloat(sellingItems.attribute.friendlyDiscount)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 9,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }

  Content.push([
    {
      text: `Final Amount = ${numeral(
        parseFloat(sellingItems.attribute.atLastTotalAll)
      ).format("0,0.00")} Taka`,
      bold: true,
      color: "#006A4E",
      colSpan: 9,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);

  return Content;
};

const renderGlassContent = sellingItems => {
  let TableHeader = ["ID", "Item", "SFT", "Rate", "Total"];
  let Content = [
    [
      {
        text: "Glass Table",
        style: "tableHeader",
        colSpan: 5,
        alignment: "center"
      },
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.sft,
      numeral(parseFloat(singleItem.rate)).format("0,0.00"),
      numeral(parseFloat(singleItem.total)).format("0,0.00")
    ];
    Content.push(item);
  });
  if (
    parseFloat(sellingItems.attribute.atLastTotalAll) !==
    parseFloat(sellingItems.attribute.allCellTotal)
  ) {
    Content.push([
      {
        text: numeral(parseFloat(sellingItems.attribute.allCellTotal)).format(
          "0,0.00"
        ),
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }

  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    // Do Nothing
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} Now Total = ${numeral(
          parseFloat(sellingItems.attribute.allCellTotal)
        ).format("0,0.00")} - ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} = ${numeral(
          parseFloat(sellingItems.attribute.afterDiscountTotal)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${numeral(
          parseFloat(sellingItems.attribute.friendlyDiscount)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${numeral(
        parseFloat(sellingItems.attribute.atLastTotalAll)
      ).format("0,0.00")} Taka`,
      bold: true,
      color: "#006A4E",
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
  return Content;
};

const renderSSContent = sellingItems => {
  let TableHeader = [
    "ID",
    "Item",
    "Company",
    "Thickness",
    "Length",
    "Quantity",
    "Rate",
    "Total"
  ];
  let Content = [
    [
      {
        text: "SS Table",
        style: "tableHeader",
        colSpan: 8,
        alignment: "center"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.companyName,
      singleItem.thickness,
      singleItem.length,
      singleItem.quantity,
      numeral(parseFloat(singleItem.rate)).format("0,0.00"),
      numeral(parseFloat(singleItem.total)).format("0,0.00")
    ];
    Content.push(item);
  });
  if (
    parseFloat(sellingItems.attribute.atLastTotalAll) !==
    parseFloat(sellingItems.attribute.allCellTotal)
  ) {
    Content.push([
      {
        text: numeral(parseFloat(sellingItems.attribute.allCellTotal)).format(
          "0,0.00"
        ),
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }

  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    // Do Nothing
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} Now Total = ${numeral(
          parseFloat(sellingItems.attribute.allCellTotal)
        ).format("0,0.00")} - ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} = ${numeral(
          parseFloat(sellingItems.attribute.afterDiscountTotal)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${numeral(
          parseFloat(sellingItems.attribute.friendlyDiscount)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 8,
        alignment: "right"
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${numeral(
        parseFloat(sellingItems.attribute.atLastTotalAll)
      ).format("0,0.00")} Taka`,
      bold: true,
      color: "#006A4E",
      colSpan: 8,
      alignment: "right"
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
  return Content;
};

const renderOthersContent = sellingItems => {
  let TableHeader = ["ID", "Item", "pc./ft/pkt", "Rate", "Total"];
  let Content = [
    [
      {
        text: "Others Table",
        style: "tableHeader",
        colSpan: 5,
        alignment: "center"
      },
      {},
      {},
      {},
      {}
    ],
    TableHeader
  ];
  sellingItems.table.forEach((singleItem, index) => {
    let item = [
      (index + 1).toString(),
      singleItem.productName,
      singleItem.quantity,
      numeral(parseFloat(singleItem.rate)).format("0,0.00"),
      numeral(parseFloat(singleItem.total)).format("0,0.00")
    ];
    Content.push(item);
  });
  if (
    parseFloat(sellingItems.attribute.atLastTotalAll) !==
    parseFloat(sellingItems.attribute.allCellTotal)
  ) {
    Content.push([
      {
        text: numeral(parseFloat(sellingItems.attribute.allCellTotal)).format(
          "0,0.00"
        ),
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }

  if (parseInt(sellingItems.attribute.discount, 10) === 0) {
    // Do nothing
  } else {
    Content.push([
      {
        text: `${sellingItems.attribute.discount}% = ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} Now Total = ${numeral(
          parseFloat(sellingItems.attribute.allCellTotal)
        ).format("0,0.00")} - ${numeral(
          parseFloat(sellingItems.attribute.discountAmount)
        ).format("0,0.00")} = ${numeral(
          parseFloat(sellingItems.attribute.afterDiscountTotal)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  if (parseInt(sellingItems.attribute.friendlyDiscount, 10) !== 0) {
    Content.push([
      {
        text: `- ${numeral(
          parseFloat(sellingItems.attribute.friendlyDiscount)
        ).format("0,0.00")}`,
        bold: true,
        colSpan: 5,
        alignment: "right"
      },
      {},
      {},
      {},
      {}
    ]);
  }
  Content.push([
    {
      text: `Final Amount = ${numeral(
        parseFloat(sellingItems.attribute.atLastTotalAll)
      ).format("0,0.00")} Taka`,
      bold: true,
      color: "#006A4E",
      colSpan: 5,
      alignment: "right"
    },
    {},
    {},
    {},
    {}
  ]);
  return Content;
};

export default GENERATE_PDF;
