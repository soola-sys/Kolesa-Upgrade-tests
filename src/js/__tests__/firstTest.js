import axios from 'axios';
import { getItemsRequest } from '../requests';

jest.mock('axios');

/**
 * Объект с успешно возвращёнными данными.
 * Отдельная константа, чтобы не повторять код в моке реализации и в проверке.
 */
const mockedResponse = { result: 'ok' };

/**
 * Объект ошибки для мока реализации.
 * Отдельная константа, чтобы не повторять код в моке реализации и в проверке.
 */
const errorResponse = new Error('Error!');

describe('Группа тестов.', () => {
    beforeAll(() => {
        axios.get
            .mockImplementationOnce(
                () => Promise.resolve(mockedResponse),
            )
            .mockImplementationOnce(
                () => Promise.reject(errorResponse),
            );
    });

    afterAll(() => {
        axios.get.mockRestore();
    });

    test('Первый тест.', () => {
        expect(2 + 2).toEqual(4);
    });

    /**
    * Два теста ниже, конечно синтетические.
    * По сути, они проверяют только то, что наш мок работает и axios не делает реальный запрос за данными.
    * Сделаны для примера того, как проверять успешный и неуспешный промис.
    */
    test('Запрос в axios должен разрешиться положительно.', () => (
        expect(axios.get('http://example.com')).resolves.toEqual(mockedResponse)
    ));

    test('Запрос в axios должен отклониться.', () => (
        expect(axios.get('http://example.com')).rejects.toEqual(errorResponse)
    ));

    /**
    * Тут более реальный пример тестирования:
    *
    * 1. Мы импортировали функцию, которую хотим протестировать.
    * 2. Создали мок запроса axios с фейковыми данными.
    * 3. Вызываем тестируемую функцию.
    * 4. Проверяем, что промис, возвращаемый функцией, разрешается данными, которые мы передали в мок.
    *
    * Точно также можно тестировать rejected промисы.
    */
    test('Пример тестирования реального запроса (getItemsRequest).', () => {
        const data = [{
            id:    1,
            title: 'Заголовок 1',
        }, {
            id:    2,
            title: 'Заголовок 2',
        }];

        axios.get.mockImplementationOnce(
            () => Promise.resolve(data),
        );

        return expect(getItemsRequest()).resolves.toEqual(data);
    });
});
