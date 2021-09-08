# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Overall Thoughts

I think I made an improvement on the readability of the code. The original was a bunch of nested if statments, and personally, it was hard for me to 
understand the logic behind the code at first glance. In my version, I split a lot of the logic into multiple methods. This way, it would make the "updateQuality"
method cleaner and readable. I have also included more tests for each item category!

I am open to any advice or feedback you may have!

## Refactor?

After refactoring and testing, I think I would still choose to refactor. By refactoring, I believe I made it easier to add more categories of items without having
to look through the original code and find where to add the additional logic. In my case, all I had to do was create new helper methods to check the item and
add/subtract the quality and sell In date. However, I still see the benefit of simply adding to the existing code. When I ran my tests on the original code, I had some failed tests. The errors came from not fully understanding the requirements of each item. Therefore, my code had some bugs in them. Although this could've been prevented with better documentation, that won't always be the case. 

