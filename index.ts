type KeyMap = {
  name: string;
  score: number;
  salary: number;
};

interface Student {
  name: string;
  score: string; // number
}

interface Teacher {
  name: string;
  salary: string; // number
}

// DBStudent, DBTeache

// get the keys
type Colors = {
  blue: "#fff";
  green: "#fff";
};

function setColor(colorName: keyof Colors) {}
type StudentKeys = keyof Student; // ["name", "score"] list of types

// union type
type UnionType = "blue" | "green"; // think of it as list of types

const colorUnionConst: UnionType = "blue";

// loop over a list of types
type T = {
  [k in UnionType]: number;
};

type DBStudent1 = {
  //k in keyof won't work with interface
  [k in keyof Student]: KeyMap[k];
};

type DBTeacher1 = {
  [k in keyof Teacher]: KeyMap[k];
};

// DO NOT FOCUS ON THIS PART

// use generics to avoid repeated code: [k in keyof Teacher]: KeyMap[k];
// 1. we want to create multiple obj types: {value: Type} where Type can be passed as parameter
// end result: type A = {value: number}, type B = {value: string};

type ObjectCreator<T> = {
  value: T;
};

type A = ObjectCreator<number>;
type B = ObjectCreator<string>;

// final DBObjects

type MapDBObject<T extends Record<string, any>> = {
  [k in keyof T]: k extends keyof KeyMap ? KeyMap[k] : T[k];
};

type DBStudent = MapDBObject<Student>;
type DBTeacher = MapDBObject<Teacher>;

interface Admin {
  name: string;
  salary: string;
  email: string;
  isVerified: boolean;
}

type DBAdmin = MapDBObject<Admin>;

export interface PatientTypes {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: string;
  id: string | number;
  medicine: string;
}

type StupidPatient = {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: number;
  id: string | number;
  medicine: string;
};

type GoodPatient = Omit<PatientTypes, "phoneNumber"> & {
  phoneNumber: number;
};

//k extends "phoneNumber" =  if k == "phoneNumber" as a type
type Patient = {
  [k in keyof PatientTypes]: k extends "phoneNumber" ? number : PatientTypes[k];
};
