import { GoogleSpreadsheet} from 'google-spreadsheet';
import {format} from 'date-fns'

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

const generateCoupon = () => {
   const code =  parseInt(format(new Date(),'ddMMyyHHmmssSSSS')).toString(16).toUpperCase()
   return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8, 4)
}

export default async(req, res)=>{
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY
        });
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A3:B3');

       const cellText = sheetConfig.getCell(2,1)
       const showCoupon = sheetConfig.getCell(2,0)

       let Cupom = ''
       let Promo = ''

       if(showCoupon.value === "VERDADEIRO"){
           Cupom = generateCoupon()
           Promo = cellText.value
       }

        await sheet.addRow({
            Nome: data.Nome,
            Email:data.Email,
            Whatsapp: data.Whatsapp,
            Nota: parseInt(data.Nota),
            'Data Preenchimento': format(new Date(),'dd/MM/yyyy, HH:mm:ss SSSS'),
            Cupom,
            Promo
        })

        res.end(JSON.stringify({
            showCoupon: Cupom !== '',
            Cupom,
            Promo
        }))

    } catch (error) {
        console.log(error)
        res.end('error')
    }
}
