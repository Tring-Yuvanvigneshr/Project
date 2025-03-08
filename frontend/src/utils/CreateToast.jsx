import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateToast() {
    return (
        <ToastContainer />
    );   
}

export const notify = ({ message, type = "info", position = "top-right", autoClose = 5000 }) => {
    if (toast[type]) {
        toast[type](message, {
            position: position,
            autoClose: autoClose,
            closeOnClick: true,
            hideProgressBar: true,
        });
    } else {
        toast.info(message, {
            position: position,
            autoClose: autoClose,
            closeOnClick: true,
            hideProgressBar: true,
        });
    }
};

export default CreateToast;
