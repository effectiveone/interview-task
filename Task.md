<h2>Advanced TypeScript Usage</h2>

<h3>Task Description</h3>

<p>Implement a function called <code>typedFreeze</code> using any TypeScript version of 4.x.x. This function should have the following behavior:</p>

<ol>
  <li><code>typedFreeze</code> should freeze the object passed to it and return the readonly version of the passed object (default behavior of <code>Object.freeze()</code>). This means that strings inside this object should be typed as their value, not as the generic <code>string</code> type.</li>
  <li>The object passed as an argument to this function should be properly typed. It should allow multilevel objects as arguments and ensure that the leaves of the passed object are either of type <code>string</code> or <code>() => string</code>. The function should also make sure that the leaves are not empty objects.</li>
  <li>Note: In this task, "leaves" refer to the values inside the object that are not of type "object". The leaves of the object provided in the task are <code>obj.key1.key2</code>, <code>obj.key1.key3.key4</code>, and <code>obj.key5</code>.</li>
</ol>

<h4>Examples</h4>

<p>Function should pass:</p>

<ul>
  <li>Example 1</li>
  <pre>
    const obj = {
      key1: {
        key2: "value",
        key3: {
          key4: () => "value",
        },
      },
      key5: "value",
    };
  </pre>
</ul>

<p>Function should not pass:</p>

<ul>
  <li>Example 2</li>
  <pre>
    const obj = {
      key1: {
        key2: {},
        key3: {
          key4: () => "value",
        },
      },
      key5: "value",
    };
  </pre>
  
  <li>Example 3</li>
  <pre>
    const obj = {
      key1: {
        key2: "value",
        key3: {
          key4: "value",
        },
      },
      key5: "value",
    };
  </pre>
</ul>

<p>Note: All the <code>TestIdXXX</code> interfaces/types used in this example are custom names assigned to recursive utility types. You can use whichever names you see fit.</p>
