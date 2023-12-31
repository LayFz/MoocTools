 [English](readme-eng.md)|[中文](readme.md) 

# **Script for Completing Courses at Yinghua Academy**

<font color= "red">User feedback, I will advance the installation and detailed implementation process [click here](#run)</font>

## Introduction
- shortly after submitting tuition fees for my arts and sciences courses, the school surprised us with a new challenge. According to school regulations, we were required to complete two online courses, followed by online exams. Failure was even a possibility. This situation left me feeling frustrated and unsatisfied. My major is Computer Science and Technology, and the courses, titled "Security Education" and another which I can't quite recall, felt utterly meaningless for us. Not only were they unimportant, but they were also a waste of time.
- As the saying goes, "Success lies in diligence and carelessness leads to failure." Instead of complaining about the situation, I decided to take matters into my own hands. After a day of research, I came up with a script solution.

## How to Install

Using Firefox as an example

### Step One

* Click [this link](https://greasyfork.org/zh-CN/scripts/473268-%E8%8B%B1%E5%8D%8E%E5%AD%A6%E5%A0%82%E5%88%B7%E8%AF%BE%E8%84%9A%E6%9C%AC).

    <img src="img\14.png" alt="" style="zoom:60%;" />

### Step Two

* If you haven't installed Tampermonkey before, you need to install it first.
* If you already have Tampermonkey installed, skip to [Step Three](#step_3)

    <img src="img\17.png" alt="" style="zoom:60%;" />

  <img src="img\18.png" alt="" style="zoom:60%;" />

  <img src="img\19.png" alt="" style="zoom:60%;" />

* As shown in the image above, seeing the application means the installation was successful.

### <span id="step_3">Step Three:</span>

  <img src="img\20.png" alt="" style="zoom:60%;" />

  <img src="img\21.png" alt="" style="zoom:60%;" />

  <img src="img\22.png" alt="" style="zoom:60%;" />

* As shown above, make sure the script is enabled.

### Step Four:

* Enter the MOOC platform, click on your course, and automatic course completion will begin. However, note that the validation is minimal. For those with dual monitors, running the script on one screen won't affect normal usage, and you won't have to manually interact.

## <span id="run">Implementation Process</span>

### Step One: Observing the DOM Layer

  <img src="img\2.png" alt="" style="zoom:60%;" />

- Upon entering the page, I noticed continuous console output, which gave me a clue. Attempts to manipulate video playback speed using JavaScript or other methods seemed ineffective.
- Click [here](img\3.png) to view the source code.

- This line of code was responsible for the output. After analyzing the source code, I understood the process. In simple terms, it continuously monitors your activity to calculate actual study time. Thus, it checks whether you have opened multiple tabs every second.

- We also observe the word "success" in the console. This can also be found in the source code [here](img\5.png).

- Line 282 of the code prints this field. After analysis, this seems to be related to the appearance of CAPTCHA. The JavaScript code here monitors mouse activity to determine whether the user is human, but its weight in decision-making is quite low, rendering it insignificant.

### Step Two: Observing the Network Layer

  <img src="img\9.png" alt="" style="zoom:60%;" />

- Thanks to previous experience with web scraping, I quickly identified the required DOM element. Therefore, at this point, I only needed to extract the necessary data to simulate actions.   

- <img src="img\1.jpg" alt="" style="zoom:60%;" />

- Following this, I designed the approach shown above and began exploring the network layer.

    <img src="img\4.png" alt="" style="zoom:60%;" />

- I noticed a suspicious piece of code here. According to the HTTP protocol, encrypted data is often stored in LocalStorage. This can be seen [here](img\6.png) and [here](img\7.png).

- According to the aforementioned JavaScript, this is likely generated based on the ID and course number. Unfortunately, we couldn't extract useful information from it. It's worth mentioning that the user's username and password are stored in plain text here, which is highly risky.

- The above is the cookie for this website, containing two tokens. One is likely generated by the backend for local permission validation, while the other is given to "樱花" (Sakura). This indicates that the videos are not relayed through a local gateway but are directly streamed from the server, justifying the use of this token.

    <img src="img\10.png" alt="" style="zoom:60%;" />

- Network-level observation also reveals that during regular class attendance, there are polling requests that report your online status and listening time to the backend. This further supports the notion that completing the course via accelerated playback is not feasible.

### Step Three: Dynamic Analysis

- Implementing the process based on the design diagram was relatively straightforward.

- Changing the video playback speed proved ineffective.

- Simulating clicks for extending course duration and automatic clicking were the primary solutions.

- Lengthy DOM operations

    <img src="img\13.png" alt="" style="zoom:60%;" />

  After extensive testing, the first version was soon completed.

### Step Four: Abandoning the Initial Approach

- As I progressed, I discovered numerous issues. The redundant operations of acquiring chapter information for each iteration made the logic overly complex, resulting in numerous bugs that rendered the script unworkable.
- Rather than exploding in complexity, I decided to pivot. I explored new approaches during testing and discovered a more streamlined solution.

### Step Five: The Fruitful Approach

  <img src="img\12.jpg" alt="" style="zoom:60%;" />

- I realized we didn't need to check every chapter. This insight led to the approach depicted above—simpler and more logically suitable.

  Ah, the journey of love is like a trip. Twisting and turning, you encounter many people, but ultimately, only one person will accompany you through the rest of your life.

## Outlook
- There are numerous scripts available on the market, but those for private networks, with self-hosted MOOCs, are often unrecognized by commercial services.
- I'm not planning to provide further updates at the moment; the existing features are sufficient to address my needs for attending online classes.
- If this script proves helpful to you, please consider giving it a star! (:

# References
- [W3school](https://www.w3school.com.cn/jquery/index.asp) - jQuery