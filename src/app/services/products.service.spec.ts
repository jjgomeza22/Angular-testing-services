import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { HttpStatusCode } from '@angular/common/http';

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
    it('should return a product list with manual Data', (doneFn) => {
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

    it('should return a product list with automatic Data', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        }
      ]
      //act
      service.getAllSimple()
      .subscribe((data) => {
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

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      //act
      service.getAll()
      .subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        //assert
        doneFn();
      });

      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return a product list with taxes', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100
        },
        {
          ...generateOneProduct(),
          price: 200
        },
        {
          ...generateOneProduct(),
          price: 0
        },
        {
          ...generateOneProduct(),
          price: -200
        }
      ];
      //act
      service.getAll()
      .subscribe((data) => {
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        //assert
        doneFn();
      });

      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      const limit = 10;
      const offset = 3;
      //act
      service.getAll(limit, offset)
      .subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        //assert
        doneFn();
      });

      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
      httpController.verify();
    });

    describe('test for create', () => {
      it('should return a new product', (doneFn) => {

        //arrange
        const mockData = generateOneProduct();
        const dto: CreateProductDTO = {
          title: 'new product',
          price: 100,
          images: ['image'],
          description: 'blablabla',
          categoryId: 12,
        }

        //Act
        service.create({...dto})
        .subscribe(data => {
          //assert
          expect(data).toEqual(mockData);
          doneFn();
        })


      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      httpController.verify();
      });
    });

    describe('test for update', () => {
      it('should return a updated product', (doneFn) => {

        //arrange
        const mockData = generateOneProduct();
        const dto: UpdateProductDTO = {
          title: 'new product',
          price: 100,
          images: ['image'],
          description: 'blablabla',
          categoryId: 12,
        }

        //Act
        service.update(mockData.id ,{...dto})
        .subscribe(data => {
          //assert
          expect(data.title).toEqual(mockData.title ?? '');
          doneFn();
        });

        //http config
        const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${mockData.id}`);
        req.flush(mockData);
        expect(req.request.method).toEqual('PUT');
        httpController.verify();
      });
    });

    describe('test for delete', () => {
      it('should return a deleted product', (doneFn) => {

        //Act
        service.delete('12')
        .subscribe(data => {
          //assert
          expect(data).toEqual(true);
          doneFn();
        });

        //http config
        const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${12}`);
        req.flush(true);
        expect(req.request.method).toEqual('DELETE');
        httpController.verify();
      });
    });

    describe('test for getOne', () => {
      it('should return a a product', (doneFn) => {

        //arrange
        const mockData = generateOneProduct();
        const productId = '1';

        //Act
        service.getOne(productId)
        .subscribe(data => {
          //assert
          expect(data).toEqual(mockData);
          doneFn();
        });

        //http config
        const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
        req.flush(mockData);
        expect(req.request.method).toEqual('GET');
        httpController.verify();
      });
    });

    it('should return a error with 404', (doneFn) => {

      //arrange
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText:msgError
      }

      //Act
      service.getOne(productId)
      .subscribe({
        error: (e) => {
          //assert
          expect(e).toEqual('El producto no existe');
          doneFn();
        }
      });

      //http config
      const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
      httpController.verify();
    });
  });
});
