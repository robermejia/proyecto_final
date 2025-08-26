export interface Student {
    id?: string;
    fullname: any;
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
}

export interface Course {
    id: string;
    name: string;
    code: string;
    credits: number;
}

export interface Inscripcion {
    id?: string;
    studentId: string;
    studentName: string;
    courseId: string;
    courseName: string;
    fechaInscripcion: Date;
    estado: 'activa' | 'cancelada' | 'completada';
}
