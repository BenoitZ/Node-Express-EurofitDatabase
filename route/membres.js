const {connection} = require('../server');

const path = (app)=>{

//get avec les jointures

  app.get('/membres', (req, res) =>{
    const {nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_abonnement, id_club, id_medecin, id_adresse} = req.body;
    connection.query('SELECT DISTINCT m.nom_membres, m.prenom_membres, m.tel, m.mail, m.certificat_medical, c.nom_club, a.titre, ad.adresse, v.ville, cp.code_postal, med.nom_medecin, med.prenom_medecin, med.mail FROM membres m INNER JOIN club c ON m.id_club = c.id_club INNER JOIN abonnement a ON m.id_abonnement = a.id_abonnement INNER JOIN adresse ad ON ad.id_adresse = c.id_adresse INNER JOIN ville v ON ad.id_ville = v.id_ville INNER JOIN code_postal cp ON cp.id_code_postal = ad.id_code_postal INNER JOIN medecin med ON med.id_adresse = ad.id_adresse LIMIT 10;', 
    // connection.query('SELECT * from membres;', 
    [nom_membres, prenom_membres, tel, mail, certificat_medical, id_abonnement, id_club, id_medecin, id_adresse], 
    (err, results) =>{
        if(err){
            console.error(err);
        }
        else {
            res.json(results);
        }})
  });

//get avec les prenoms
  app.get('/membres/:prenom_membres', (req, res) =>{
    const id_prenom_membres = req.params.prenom_membres;
    connection.query('SELECT DISTINCT m.nom_membres, m.prenom_membres, m.tel, m.mail, m.certificat_medical, c.nom_club, a.titre, ad.adresse, v.ville, cp.code_postal, med.nom_medecin, med.prenom_medecin, med.mail FROM membres m INNER JOIN club c ON m.id_club = c.id_club INNER JOIN abonnement a ON m.id_abonnement = a.id_abonnement INNER JOIN adresse ad ON ad.id_adresse = c.id_adresse INNER JOIN ville v ON ad.id_ville = v.id_ville INNER JOIN code_postal cp ON cp.id_code_postal = ad.id_code_postal INNER JOIN medecin med ON med.id_adresse = ad.id_adresse WHERE prenom_membres = ?', [id_prenom_membres], 
    (err, results) =>{
        if(err){
            console.error(err);
        }
        else {
            res.json(results);
        }})
  });

//get avec tout
  app.get('/membres/:value', (req, res) =>{
    // let value = {};
    // const id_param = req.params.id;
    let id_valeur = req.body.value;
    // const id_nom_membres = req.params.nom_membres;
    // const id_tel = req.params.tel;
    // const id_mail = req.params.mail;
    // const id_certificat_medical = req.params.certificat_medical;
    // const id_nom_club = req.params.nom_club;
    // const id_titre = req.params.titre;
    // const id_adresse = req.params.adresse;

    // const id_certificat_medical = req.params.certificat_medical;
    // const id_nom_club = req.params.nom_club;
    // const id_titre = req.params.titre;
    // const id_adresse = req.params.adresse;

    connection.query('SELECT DISTINCT m.nom_membres, m.prenom_membres, m.tel, m.mail, m.certificat_medical, c.nom_club, a.titre, ad.adresse, v.ville, cp.code_postal, med.nom_medecin, med.prenom_medecin, med.mail FROM membres m INNER JOIN club c ON m.id_club = c.id_club INNER JOIN abonnement a ON m.id_abonnement = a.id_abonnement INNER JOIN adresse ad ON ad.id_adresse = c.id_adresse INNER JOIN ville v ON ad.id_ville = v.id_ville INNER JOIN code_postal cp ON cp.id_code_postal = ad.id_code_postal INNER JOIN medecin med ON med.id_adresse = ad.id_adresse WHERE assigned_to_id = [id_valeur];', [id_valeur], 
    (err, results) =>{
        if(err){
            console.error(err);
        }
        else {
            res.json(results);
        }})
  });

  app.post('/membres', (req, res) => {
    const { nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse } = req.body;   
    // if (!titre) {
    //   res.status(400).json({ error: 'Le titre est obligatoire' });
    //   return;
    // } 
    connection.query(
        'INSERT INTO membres(nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(201).json({ message: 'Abonnement créé avec succès' });
        }
      }
    )
  });

  app.patch('/membres/:id/:value', (req, res) => {
    const id_membres = req.params.id;
    let value = {};   
    if (req.params.value === 'nom_membres') {
        value = req.body.nom_membres  
        reqSql = 'UPDATE membres SET nom_membres = ? WHERE id_membres = ?'
    } else if (req.params.value === 'prenom_membres') {
        value = req.body.prenom_membres
        reqSql = 'UPDATE membres SET prenom_membres = ? WHERE id_membres = ?'
    } else if (req.params.value === 'tel') {
        value = req.body.tel
        reqSql = 'UPDATE membres SET tel = ? WHERE id_membres = ?'
    } else if (req.params.value === 'mail') {
        value = req.body.mail
        reqSql = 'UPDATE membres SET mail = ? WHERE id_membres = ?'
    } else if (req.params.value === 'certificat_medical') {
        value = req.body.certificat_medical
        reqSql = 'UPDATE membres SET certificat_medical = ? WHERE id_membres = ?'
    } else if (req.params.value === 'card_number') {
        value = req.body.card_number
        reqSql = 'UPDATE membres SET card_number = ? WHERE id_membres = ?'
    } else if (req.params.value === 'card_date') {
        value = req.body.card_date
        reqSql = 'UPDATE membres SET card_date = ? WHERE id_membres = ?'
    } else if (req.params.value === 'CCV') {
        value = req.body.CCV
        reqSql = 'UPDATE membres SET CCV = ? WHERE id_membres = ?'
    } else if (req.params.value === 'password') {
        value = req.body.password
        reqSql = 'UPDATE membres SET password = ? WHERE id_membres = ?'
    } else if (req.params.value === 'card_date') {
        value = req.body.card_date
        reqSql = 'UPDATE membres SET card_date = ? WHERE id_membres = ?'
    } else if (req.params.value === 'CCV') {
        value = req.body.CCV
        reqSql = 'UPDATE membres SET CCV = ? WHERE id_membres = ?'
    } else {
        console.error("error");
    }
    connection.query(
      reqSql,
      [value, id_membres],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(201).json({ message: 'Membre modifié avec succès' });
        }
      }
    )
  });

  app.put('/membres/:id', (req, res) => {
    const { nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse } = req.body;   
    const id_membres = req.params.id;
    connection.query(
      'UPDATE  membres SET nom_membres = ?, prenom_membres = ?, tel = ?, mail = ?, certificat_medical = ?, card_number = ?, card_date = ?, CCV = ?, password = ?, id_club = ?, id_abonnement = ?, id_medecin = ?, id_adresse = ? WHERE id_membres = ?',
      [nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse, id_membres],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(201).json({ message: 'Abonnement modifié avec succès' });
        }
      }
    )
  });

  app.delete('/membres/:id', (req, res)=> {
    const id_membres = req.params.id;
    connection.query('DELETE FROM membres WHERE id_membres = ?;', [id_membres], (err, results)=>{
        if(err){
            console.error(err);
        } else {
            if(results.affectedRows === 0) {
                res.status(404).send('Abonnement non trouvée')
            }
            else{
                res.status(200).send('Abonnement supprimé avec succés')
            }
        }})
  });
}

module.exports = path;