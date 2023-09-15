const mongoose = require('mongoose');
const fs = require('fs');

require('dotenv').config();

const connectionURL = process.env.MONGO_DATABASE_URL as string;

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB\'ye bağlantı başarılı!');

    const productSchema = new mongoose.Schema({
      english: String,
      turkish: String
    });
    const Product = mongoose.model('B2', productSchema); // "B2" koleksiyonunu hedeflediğiniz varsayımıyla değiştirin

    const jsonData = fs.readFileSync('../../data.json', 'utf8'); // Dosya okuma işlemini utf8 ile belirtin
    const data = JSON.parse(jsonData);

    data["B2"].forEach((item: { eng: string, trk: string }) => {
      const product = new Product({
        english: item.eng,
        turkish: item.trk,
      });

      product.save()
        .then(() => {
          console.log('Ürün kaydedildi:');
        })
        .catch((error: Error) => {
          console.error('Ürün kaydedilemedi:', error);
        });
    });
  })
  .catch((error: Error) => {
    console.error('MongoDB\'ye bağlantı hatası:', error);
  });
