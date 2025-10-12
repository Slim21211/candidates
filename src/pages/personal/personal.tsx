import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Personal = () => {
    const navigate = useNavigate();

    return (
        <div style={{padding: 16}}>
            <p>Текст про согласие персональных данных</p>
            <Button title="Назад" onClick={() => navigate(-1)}>Назад</Button>
        </div>
    
)
}

export default Personal;