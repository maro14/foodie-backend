const Item = require('../../../src/models/item');
const { getItems, addItem, getItem } = require('../../../src/controllers/item');

describe('Item Controller', () => {
    describe('getItems', () => {
        it('should return all items', async () => {
            await Item.create([
                { name: 'Item 1', price: 10 },
                { name: 'Item 2', price: 20 }
            ]);

            const req = mockRequest();
            const res = mockResponse();

            await getItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.arrayContaining([
                        expect.objectContaining({ name: 'Item 1' }),
                        expect.objectContaining({ name: 'Item 2' })
                    ])
                })
            );
        });
    });

    describe('addItem', () => {
        it('should create a new item', async () => {
            const req = mockRequest({
                body: {
                    name: 'New Item',
                    price: 15,
                    description: 'Test description'
                }
            });
            const res = mockResponse();

            await addItem(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({
                        name: 'New Item',
                        price: 15
                    })
                })
            );
        });
    });
});
