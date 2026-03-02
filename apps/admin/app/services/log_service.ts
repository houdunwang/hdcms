import fs from 'node:fs';
import readline from 'node:readline';

export class LogService {
  /**
   * 读取日志文件的前几行
   * @param filePath 日志文件路径
   * @param limit 读取的行数，默认10行
   * @returns 日志内容数组
   */
  async readFirstLines(filePath: string, limit = 20) {
    const lines: string[] = [];
    const stream = fs.createReadStream(filePath, {
      encoding: 'utf-8',
      highWaterMark: 64 * 1024, // 合理的块大小，避免内存峰值
    });

    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

    try {
      for await (const line of rl) {
        const json = JSON.parse(line);
        if (json.err?.stack) {
          console.log(json.err.stack);
          json.err.stack = json.err.stack.replace(/\n/g, '<br/>');
        }
        lines.push(json);
        if (lines.length >= limit) {
          rl.close();        // 提前关闭 readline
          stream.destroy();  // 立刻销毁底层流，避免继续读取
          break;
        }
      }
      return lines;
    } catch (err) {
      rl.close();
      stream.destroy();
      throw err;
    }
  }
}