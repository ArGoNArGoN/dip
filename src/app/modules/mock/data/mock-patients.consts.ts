import {Patient} from "../../infrastructure-models/patient/patient.interfaces";
import {EMPTY_METHOD} from "./mock.consts";

export const PATIENT_WITH_CONTACT: Patient = {
    lastName: 'Масленников',
    firstName: 'Кирилл',
    patronymic: 'Евгеньевич',
    setContact: EMPTY_METHOD,
    contactId: 1,
    contact: {
        id: 1,
        firstPhone: '79823814601',
    },
};

export const ALL_PATIENTS: Array<Patient> = [
    PATIENT_WITH_CONTACT,
    {lastName: 'Прохоров', firstName: 'Ярослав', patronymic: 'Маркович', setContact: EMPTY_METHOD, contactId: 2},
    {lastName: 'Митрофанов', firstName: 'Илья', patronymic: 'Ярославович', setContact: EMPTY_METHOD, contactId: 3},
    {lastName: 'Михеева', firstName: 'Мия', patronymic: 'Дмитриевна', setContact: EMPTY_METHOD, contactId: 4},
    {lastName: 'Павлов', firstName: 'Леон', patronymic: 'Алексеевич', setContact: EMPTY_METHOD, contactId: 5},
    {lastName: 'Соболева', firstName: 'Анна', patronymic: 'Александровна', setContact: EMPTY_METHOD},
    {lastName: 'Григорьева', firstName: 'Мария', patronymic: 'Александровна', setContact: EMPTY_METHOD, contactId: 7},
    {lastName: 'Волошина', firstName: 'Лилия', patronymic: 'Тимофеевна', setContact: EMPTY_METHOD, contactId: 8},
    {lastName: 'Иванова', firstName: 'Анастасия', patronymic: 'Георгиевна', setContact: EMPTY_METHOD, contactId: 9},
    {lastName: 'Ковалева', firstName: 'Василиса', patronymic: 'Артуровна', setContact: EMPTY_METHOD},
];
