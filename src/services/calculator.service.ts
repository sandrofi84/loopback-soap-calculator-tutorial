import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CalculatorDataSource} from '../datasources';
import {AddResponse, CalculatorParameters, DivideResponse, MultiplyResponse, SubtractResponse} from '../interfaces';

export interface CalculatorService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  multiply(args: CalculatorParameters): Promise<MultiplyResponse>;
  add(args: CalculatorParameters): Promise<AddResponse>;
  divide(args: CalculatorParameters): Promise<DivideResponse>;
  subtract(args: CalculatorParameters): Promise<SubtractResponse>;
}

export class CalculatorServiceProvider implements Provider<CalculatorService> {
  constructor(
    // calculator must match the name property in the datasource json file
    @inject('datasources.calculator')
    protected dataSource: CalculatorDataSource = new CalculatorDataSource(),
  ) {}

  value(): Promise<CalculatorService> {
    return getService(this.dataSource);
  }
}
