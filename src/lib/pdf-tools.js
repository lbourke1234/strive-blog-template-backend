import pdfPrinter from 'pdfmake'

export const getPDFReadableStream = (blogPost) => {
  const fonts = {
    Roboto: {
      normal: 'Helvetica',
      bold: 'Helvetica'
    }
  }

  const fetchPicture = () => {
    // const response = fetch(blogPost.cover)
  }

  const printer = new pdfPrinter(fonts)

  const docDefinition = {
    content: [
      {
        text: blogPost.title,
        style: 'header'
      },
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
      {
        text: blogPost.category,
        style: 'subheader'
      },
      blogPost.content,
      {
        text: 'Subheader 2 - using subheader style',
        style: 'subheader'
      },
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
      {
        text: blogPost.name,
        style: ['quote', 'small']
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      small: {
        fontSize: 8
      },
      defaultStyle: {
        font: 'Helvetica'
      }
    }
  }
  const getPDFReadableStream = printer.createPdfKitDocument(docDefinition, {})

  getPDFReadableStream.end()

  return getPDFReadableStream
}
