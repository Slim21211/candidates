import { Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

// Типизация данных формы
interface CandidateFormData {
  fullName: string;
  age: number;
  mail: string;
  agreement: boolean;
}

const FormComponent = () => {
  const [form] = Form.useForm<CandidateFormData>();

  useEffect(() => {
    // Минимальная инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Сообщаем Telegram, что приложение загружено

      // Раскрываем на весь экран (иногда нужно вызвать дважды)
      tg.expand();
      setTimeout(() => tg.expand(), 100);
    }
  }, []);

  const onFinish = (values: CandidateFormData) => {
    console.log('Form values:', values);

    // Отправляем данные боту (если нужно)
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(values));
    }

    // Или отправляем на свой сервер
    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values)
    // });
  };

  const link = <Link to={'/personal'}>персональных данных</Link>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Анкета кандидата</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="ФИО"
          name="fullName"
          rules={[{ required: true, message: 'Введите ФИО' }]}
        >
          <Input placeholder="Иван Иванов" className={styles.input} />
        </Form.Item>

        <Form.Item
          label="Возраст"
          name="age"
          rules={[{ required: true, message: 'Введите ваш возраст' }]}
        >
          <Input type="number" placeholder="21" className={styles.input} />
        </Form.Item>

        <Form.Item
          label="Адрес электронной почты"
          name="mail"
          rules={[
            {
              required: true,
              message: 'Введите адрес вашей электронной почты',
            },
          ]}
        >
          <Input
            type="email"
            placeholder="example@mail.ru"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Поставьте согласие' }]}
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
