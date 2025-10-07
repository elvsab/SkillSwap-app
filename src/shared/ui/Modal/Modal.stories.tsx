import type { Meta, StoryObj } from "@storybook/react-vite";

import { Modal } from "./Modal";

const meta = {
  title: "shared/ui/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  args: {
    onClose: () => console.log("Закрытие модального окна"),
  },
  render: (args) => {
    return (
      <>
        <div>
          <h1>Пустая страница</h1>
          <Modal {...args}>{args.children}</Modal>
        </div>
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  args: {
    isOpen: true,
    children: <p>Пример текста внутри модального окна.</p>,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    children: <p>Пример текста внутри модального окна.</p>,
  },
};

export const LargeContent: Story = {
  args: {
    isOpen: true,
    children: (
      <div style={{ padding: 0, width: "904px" }}>
        <h2 style={{ marginTop: 0 }}>Модальное окно с большим контентом</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3>Левая колонка</h3>
            <p>Содержимое левой колонки с различными элементами:</p>
            <ul>
              <li>Элемент списка 1</li>
              <li>Элемент списка 2</li>
              <li>Элемент списка 3</li>
              <li>Элемент списка 4</li>
              <li>Элемент списка 5</li>
            </ul>
          </div>

          <div>
            <h3>Правая колонка</h3>
            <p>Форма с несколькими полями ввода:</p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Имя"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="tel"
                placeholder="Телефон"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <textarea
                placeholder="Комментарий"
                rows={3}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button>Отмена</button>
          <button>Сохранить</button>
        </div>
      </div>
    ),
  },
};

export const ScrollableContent: Story = {
  args: {
    isOpen: true,
    children: (
      <div>
        <h2
          style={{
            marginTop: 0,
          }}
        >
          Прокручиваемый контент
        </h2>
        <div
          style={{
            padding: "20px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <p>
            Это модальное окно демонстрирует поведение при большом количестве
            контента с вертикальной прокруткой.
          </p>

          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              style={{
                marginBottom: "16px",
                padding: "12px",
                background: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                border: "1px solid #e9ecef",
                borderRadius: "4px",
              }}
            >
              <strong>Элемент {i + 1}</strong>
              <p style={{ margin: "8px 0 0 0" }}>
                Это элемент списка с некоторым содержимым для демонстрации
                прокрутки. Текст занимает несколько строк и показывает, как
                контент ведет себя при скролле.
              </p>

              {i === 14 && (
                <div
                  style={{
                    background: "#fff3cd",
                    padding: "12px",
                    borderRadius: "4px",
                    marginTop: "8px",
                    border: "1px solid #ffecb5",
                  }}
                >
                  <strong>🎯 Середина контента</strong>
                  <p style={{ margin: "8px 0 0 0" }}>
                    Вы находитесь в середине прокручиваемой области. Продолжайте
                    скроллить, чтобы увидеть больше контента.
                  </p>
                </div>
              )}
            </div>
          ))}

          <div
            style={{
              background: "#d1ecf1",
              padding: "16px",
              borderRadius: "4px",
              textAlign: "center",
              border: "1px solid #bee5eb",
            }}
          >
            <strong>🏁 Конец контента</strong>
            <p style={{ margin: "8px 0 0 0" }}>
              Вы достигли конца прокручиваемой области. Весь контент успешно
              поместился благодаря вертикальной прокрутке.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};
