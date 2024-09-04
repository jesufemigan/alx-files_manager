import { getCurrentUser } from "../utils/auth";
import File from '../utils/file';

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
}

export default FilesController;