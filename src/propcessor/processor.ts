export function beforePostProcessor(data){
    data["$age"] = 23
    return data
}