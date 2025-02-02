import express from "express";
const FroalaEditor = require("wysiwyg-editor-node-sdk");


const router = express.Router();

router.post("/upload", (req, res) => {
FroalaEditor.Image.upload(req, "/uploads/", (err: Error | null, data: any) => {
    if (err) return res.status(500).send(err);
    res.send(data);
});
});

export default router;
