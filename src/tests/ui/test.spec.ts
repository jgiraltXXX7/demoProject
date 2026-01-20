import {test,expect} from "@playwright/test";
import { Verify } from "crypto";

test('Go to the login accept agreement and open user profile', async({page})=>{
  await test.step('1.Go to login page', async ()=>{
    await page.goto('http//www.example.com')
  });

  await test.step('2.Fill required  field and submit',async ()=>{
    await page.fill('#email','example@test.com')
    await page.fill('#password','demo-user')
    await page.click('#submitButton')
  });

  await test.step('3.verify if the home page title is dsiplayed',async()=>{
    const title = await page.title();
    expect(title).toBe('homePageTitle');
  });

  await test.step('4.Accept agreement checkbox',async()=>{
    const agreementCheckbox = page.locator('#agreementCheckbox');
    await agreementCheckbox.click()
    //verify if the agreement checkbox has been checked
    await expect(agreementCheckbox).toBeChecked()
  });

  await test.step('5.Click user profile Tab',async()=>{
    const userProfileTab = page.locator('#userProfileTab')
    await userProfileTab.click();

    //verify if the user profile is displayed 
    const userNameInput = page.locator('#userNameInput')
    await expect(userNameInput).toBeVisible();
  });

  

});
