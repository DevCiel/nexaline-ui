import { test, expect } from '@playwright/test'; import AxeBuilder from '@axe-core/playwright';

for(const example of [{path:'/examples/html/index.html',heading:'HTML example'},{path:'/examples/php/index.php',heading:'PHP example'}]){
  test(`${example.heading} loads compiled assets and passes automated accessibility`,async({page})=>{
    const errors:string[]=[];page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
    const response=await page.goto(example.path);expect(response?.ok()).toBe(true);await expect(page.getByRole('heading',{name:example.heading})).toBeVisible();
    await expect(page.locator('.nx-btn')).toHaveCSS('display','inline-flex');expect(await page.evaluate(()=>typeof window.NexalineUI?.init)).toBe('function');
    const results=await new AxeBuilder({page}).analyze();expect(results.violations.filter(item=>['serious','critical'].includes(item.impact??''))).toEqual([]);expect(errors).toEqual([]);
  });
}
