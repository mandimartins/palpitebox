import { GoogleSpreadsheet} from 'google-spreadsheet';

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async(req, res)=>{

    try {
        await doc.useServiceAccountAuth({
            type: process.env.TYPE,
            project_id:process.env.PROJECT_ID,
            private_key_id: process.env.PRIVATE_KEY_ID,
            private_key: process.env.PRIVATE_KEY,
            client_email:process.env.CLIENT_EMAIL,
            client_id: process.env.CLIENT_ID,
            auth_uri: process.env.AUTH_URI,
            token_uri: process.env.TOKEN_URI,
            auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
        });

        await doc.loadInfo()
    
        const sheet = doc.sheetsByIndex[2]
         await sheet.loadCells('A3:B3');

        const cellText = sheet.getCell(2,1)
        const showCoupon = sheet.getCell(2,0)

        res.end(JSON.stringify  ({
            showCoupon: showCoupon.value === 'VERDADEIRO',
            message:cellText.value
         }))

    } catch (error) {
        res.end(JSON.stringify  ({
            showCoupon: false,
            message: "Algo deu errado"
        }))
    }
}
