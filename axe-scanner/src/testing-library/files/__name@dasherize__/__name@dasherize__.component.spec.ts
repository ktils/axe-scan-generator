import { axe, toHaveNoViolations } from "jasmine-axe";
import { TestBed } from "@angular/core/testing";
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        <%= classify(name) %>Component
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testingApp'`, () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testingApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('testingApp app is running!');
  });

  it("should pass accessibility test", async () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
