import {ISearchPatientsResponse} from "@port-type/patients/models/patients.interfaces";

export const GET_PATIENTS: ISearchPatientsResponse = {
    result: [
        {fio: {secondName: 'Прохоров', firstName: 'Ярослав', patronymic: 'Маркович'}, contactId: '12'},
        {fio: {secondName: 'Митрофанов', firstName: 'Илья', patronymic: 'Ярославович'}, contactId: '10'},
        {fio: {secondName: 'Михеева', firstName: 'Мия', patronymic: 'Дмитриевна'}},
        {fio: {secondName: 'Павлов', firstName: 'Леон', patronymic: 'Алексеевич'}},
        {fio: {secondName: 'Соболева', firstName: 'Анна', patronymic: 'Александровна'}},
    ],
    count: 5,
}
