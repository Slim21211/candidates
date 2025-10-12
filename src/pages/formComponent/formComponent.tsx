import { Form, Input, Button, Checkbox } from "antd";
import styles from './styles.module.scss';
import { Link } from "react-router-dom";

const FormComponent = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FormData) => {
    console.log('Form values:', values);
  };

  const link = <Link to={'/personal'}>персональных данных</Link>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Анкета кандидата</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="ФИО"
          name="fullName"
          rules={[{ required: true, message: "Введите ФИО" }]}
        >
          <Input placeholder="Иван Иванов" className={styles.input} />
        </Form.Item>

        <Form.Item
          label="Возраст"
          name="age"
          rules={[{ required: true, message: "Введите ваш возраст" }]}
        >
          <Input type="number" placeholder="21" className={styles.input} />
        </Form.Item>

        <Form.Item
          label="Адрес электронной почты"
          name="mail"
          rules={[{ required: true, message: "Введите адрес вашей электронной почты" }]}
        >
          <Input type="mail" placeholder="example@mail.ru" className={styles.input} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{ required: true, message: "Поставьте согласие" }]}
        >
          <Checkbox className={styles.checkbox}>
            Согласие на обработку {link}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
