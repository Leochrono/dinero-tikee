export class RequestService
{
    method: "POST" | "GET" = "POST";
    service_url: string;
    content_type: string = "application/json";
    key_autorization: string;
    value_autorization: string;
    header_adicionals: [{ value: string, key: string }];
    wait_response: boolean = true;
    data: any;
}
