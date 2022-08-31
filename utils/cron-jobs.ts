import { CronJob } from 'cron'
import { updateChartHistory } from '../services/coins.history.service';
import { updateCurrencyMarketData } from "../services/coins.market.service";

export const updateCoinsData = () => {
    //At every 30 seconds.
    new CronJob('*/1 * * * *', async () =>{
       await updateCurrencyMarketData();
    }).start();

    //At every 40th minute.
    new CronJob('*/40 * * * *', async () =>{
        await updateChartHistory(1)
            .catch(err => console.log('When updating single day requests ' + err.message));
    }).start();

    //At minute 10 past every 2nd hour.
    new CronJob('10 */2 * * * ', async () => {
        await updateChartHistory(7)
            .catch(err => console.log('When updating week requests ' + err.message));
    }).start();

    //At minute 30 past every 12th hour
    new CronJob('30 */12 * * *', async () => {
        await updateChartHistory(30)
            .catch(err => console.log('When updating month requests ' + err.message));
    }).start();

    //At minute 15 past every 24th hour.
    new CronJob('10 */24 * * *', async () => {
        await updateChartHistory(365)
            .catch(err => console.log('When updating year requests ' + err.message));
    }).start();
}
