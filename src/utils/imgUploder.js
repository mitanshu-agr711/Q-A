import express from "express";
import FroalaEditor from "wysiwyg-editor-node-sdk";

const router = express.Router();

router.post("/upload", (req, res) => {
    FroalaEditor.Image.upload(req, "/uploads/", (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(data);
    });
});

export default router;
