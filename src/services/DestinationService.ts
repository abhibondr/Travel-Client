import { API, endpoints } from "../api";

class DestinationService {
  static createDestination(destination: FormData) {
    return API.post(endpoints?.api?.destinations?.create, destination);
  }
  static updateDestination(id: string, destination: FormData) {
    return API.put(endpoints?.api?.destinations?.update + id, destination);
  }
  static deleteDestination(id: string) {
    return API.delete(endpoints?.api?.destinations?.delete + id);
  }
  static getOneDestination(id: string) {
    return API.get(endpoints?.api?.destinations?.getOne + id);
  }
  static getAllDestinations(query: string = "") {
    return API.get(endpoints?.api?.destinations?.getAll + query);
  }
}

export default DestinationService;
