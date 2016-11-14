import { Final2Page } from './app.po';

describe('final2 App', function() {
  let page: Final2Page;

  beforeEach(() => {
    page = new Final2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
