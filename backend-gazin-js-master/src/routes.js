import { Router } from "express";
import { deleteNivel, insertNivel, updateNivel, selectNiveis, selectNivel } from './Controler/Nivel.js';
import { deleteDesenvolvedor, insertDesenvolvedor, selectDesenvolvedor, selectDesenvolvedores, updateDesenvolvedor } from './Controler/Desenvolvedores.js'

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/desenvolvedores', selectDesenvolvedores);
router.get('/desenvolvedor/:id', selectDesenvolvedor);
router.put('/desenvolvedores/:id', updateDesenvolvedor);
router.post('/desenvolvedores', insertDesenvolvedor);
router.delete('/desenvolvedores/:id', deleteDesenvolvedor);

router.post('/nivel', insertNivel);

router.get('/niveis', selectNiveis);

router.get('/nivel/:id', selectNivel);
router.put('/nivel/:id', updateNivel);
router.delete('/nivel/:id', deleteNivel);

export default router;