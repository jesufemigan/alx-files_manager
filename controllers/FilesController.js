import { getCurrentUser } from "../utils/auth";
import File, { FilesCollection } from '../utils/file';

class FilesController {
    
    static async postUpload(req, res) {
        const currentUser = await getCurrentUser(req);

        if (!currentUser) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const { name, type, parentId, isPublic, data } = req.body;

        try {
            const file = new File(
                currentUser.id, name, type, parentId, isPublic, data
            );
            const savedFile = await file.save()
            // if (savedFile.type === 'image') {
            //     fileQueue.add({
            //         userId: currentUser.id,
            //         fileId: savedFile.id
            //     });
            // }
            return res.status(201).json(savedFile);
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }

    }

    static async getShow(req, res) {
        const currentUser = await getCurrentUser(req);

        if (!currentUser) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const { id } = req.params;
        const filesCollection = new FilesCollection();
        const file = await filesCollection.findUserFileById(currentUser.id, id);
        if (!file) {
            return res.status(404).json({
                error: 'Not found'
            })
        }
        return res.status(200).json(file);
    }

    static async getIndex(req, res) {
        const currentUser = await getCurrentUser(req);

        if (!currentUser) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }
        let { parentId, page } = req.query;
        if (parentId === '0' || !parentId) {
            parentId = 0;
        }
        page = Number.isNaN(page) ? 0 : Number(page);

        const filesCollection = new FilesCollection();
        const files = await filesCollection.findAllUserFilesByParentId(
            currentUser.id,
            parentId,
            page
        )

        return res.status(200).json(files)
    }
}

export default FilesController;