import { DateFormat } from "src/application/Common/entities/date";
import { UniqueEntityId } from "src/application/Common/entities/unique-entity-id";

export class EmailRequest
{
    idUser: string;
    idInstitution: number = 0;
    idSolution: number = 0;
    idRequest: string = new UniqueEntityId().toString();
    processDate: string = new DateFormat().currentDateTime();
    process: string;
    tipo: string = "EMAIL";
    prioridad: string = "MEDIA";
    destinos: string[];
    plantilla: string;
    lista_vals_email: string[];
    lista_vars_email: string[];
    asunto: string;
    nom_envia: string = "automatizaciones@tikee.tech";
    correo_envia: string;
    intentos: number = 2;
}
