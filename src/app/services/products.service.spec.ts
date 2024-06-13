import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          id: '1',
          title: 'product 1',
          price: 100,
          description: 'description 1',
          category: {
            id: 1,
            name: 'category 1'
          },
          images: [
            'https://img.uswitch.com/n36b8lzdmgnp/6flMYPMjJ0sZzNs16Fsqa/c525a3f838b0e62716631f003390506b/shutterstock_1736005427212121212.jpg?auto=format%2Ccompress&q=35&ixlib=react-9.5.1-beta.1',
            'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/02/hipertextual-samsung-galaxy-a51-2020945736.jpg?resize=800%2C600&quality=50&strip=all&ssl=1'
          ]
        },
      ];
      //act
      service.getAllSimple()
      .subscribe((data) => {
        expect(data[0].id).toBe('1');
        expect(data).toEqual(mockData);
        //assert
        doneFn();
      });

      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
