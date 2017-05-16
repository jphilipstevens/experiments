import * as Service from "./lcbo/service";
import { createView } from "./terminal-view";

Service.getProducts().subscribe(createView());