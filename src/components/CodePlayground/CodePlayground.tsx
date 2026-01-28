import React, { useState } from 'react';
import styles from './CodePlayground.module.css';

// Syntax highlighting helper for ***plain code
function formatPlainCode(code: string): string {
  let formatted = code;
  
  // Highlight headers (***Header:***)
  formatted = formatted.replace(/(\*\*\*[^*]+\*\*\*)/g, '<span class="plain-header">$1</span>');
  
  // Highlight template includes
  formatted = formatted.replace(/({%[^%]+%})/g, '<span class="plain-template">$1</span>');
  
  // Highlight links
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="plain-link">[$1]($2)</span>');
  
  // Highlight concepts (:Name:)
  formatted = formatted.replace(/(:[\w]+:)/g, '<span class="plain-concept">$1</span>');
  
  return formatted;
}

// Syntax highlighting helper for output code
function formatOutputCode(code: string, exampleId: string): string {
  if (exampleId === 'saas') {
    // Python syntax highlighting
    return code
      .replace(/(def|try|except|for|import|from|return|if|as)/g, '<span class="py-keyword">$1</span>')
      .replace(/(setup_logging|parse_arguments|load_credentials|authenticate_with_intercom|fetch_intercom_users|main|print|get)/g, '<span class="py-function">$1</span>')
      .replace(/(f?"[^"]*"|f?'[^']*')/g, '<span class="py-string">$1</span>')
      .replace(/(#[^\n]*)/g, '<span class="py-comment">$1</span>')
      .replace(/(logger|args|credentials|session|users|user|Exception|e)/g, '<span class="py-builtin">$1</span>');
  } else {
    // TypeScript/React syntax highlighting
    return code
      .replace(/(export|default|function|const|return|type|import|from)\b/g, '<span class="ts-keyword">$1</span>')
      .replace(/\b(TaskManager|useState|map|filter|setTasks|setName|addTask|toggle|remove)\b/g, '<span class="ts-function">$1</span>')
      .replace(/\b(number|any|string|boolean)\b/g, '<span class="ts-type">$1</span>')
      .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, '<span class="ts-string">$1</span>')
      .replace(/(<\/?\w+[^>]*>)/g, '<span class="ts-tag">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="ts-constant">$1</span>')
      .replace(/(\/\/[^\n]*)/g, '<span class="ts-comment">$1</span>');
  }
}

interface CodeExample {
  id: string;
  label: string;
  code: string;
  output: string;
  inputFile: string;
  outputFile: string;
  codeLanguage: 'plainLang' | 'python' | 'typescript';
}

const examples: CodeExample[] = [
  {
    id: 'saas',
    label: 'SaaS Integration',
    inputFile: 'intercom_client.plain',
    outputFile: 'intercom_client.py',
    codeLanguage: 'plainLang',
    code: `{% include "python-console-app-template.plain" %}

***Definitions:***
- :API: is a REST interface provided by Intercom.
- :UsersLists: is the list of :API: users.

***Non-Functional Requirements:***
- The resource [intercom-openapi.json](https://github.com/Codeplain-ai/intercom-openapi.json) describes :API:.

***Test Requirements:***
- :ConformanceTests: should use the real server of :API: - do not use mock server.
- The resource [intercom-credentials.json](../credentials/intercom-credentials.json) contains credentials that can be used for testing.

***Functional Requirements:***
- :App: should take credentials json as the only positional argument.
- Authenticate with :API:.
- Fetch :UsersLists: from :API:.
- Print :UsersLists: to the console.`,
    output: `# intercom-client.py

def main(args=None):
    try:
        logger = setup_logging()
        logger.info("Application started")
        
        args = parse_arguments(args)
        credentials = load_credentials(args.credentials_file, logger)
        logger.info("Credentials loaded successfully")
        
        session = authenticate_with_intercom(
            credentials['access_token'], logger
        )
        logger.info("Authentication successful")
        
        users = fetch_intercom_users(session, logger)
        
        print("\\nIntercom Users:")
        for user in users:
            print(f"Name: {user.get('name', 'N/A')}, Email: {user.get('email', 'N/A')}\\n")
            
    except Exception as e:
        logger.error(f"An error occurred: {e}", exc_info=True)`
  },
  {
    id: 'task-manager',
    label: 'Task Manager',
    inputFile: 'task_manager.plain',
    outputFile: 'task_manager.tsx',
    codeLanguage: 'plainLang',
    code: `{% include "typescript-react-app-template.plain" %}

***Definitions:***
- :User: is the user of :App:.
- :Task: describes an activity that needs to be done by :User:. The Task has the following attributes
  - Name - (required) - a short description of :Task:. The name must be at least 3 characters long.
  - Notes - additional details about The Task.

***Test Requirements:***
- :ConformanceTests: should be implemented in React using Jest.

***Functional Requirements:***
- Show :TaskList:. The details of the user interface are provided in [task_list_ui_specification](https://github.com/codeplain/task-manager.png).
- :User: should be able to add :Task:. The details of the user interface are provided [new_task_modal_specification](https://github.com/codeplain/new-task.png).
- :User: should be able to delete :Task:.
- :User: should be able to edit :Task:.
- :User: should be able to mark :Task: as completed.`,
    output: `export default function TaskManager() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [name, setName] = useState("");

  const addTask = () =>
    name.length >= 3 && setTasks(t => [...t, {name, done: false }]);
  const toggle = (id: number) =>
    setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const remove = (id: number) =>
    setTasks(t => t.filter(x => x.id !== id));

  return (
    <div>
      <h1>Task List App</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addTask}>Add New Task</button>
      {tasks.map(t => ( <div key={t.id}>
        <input checked={t.done} onChange={() => toggle(t.id)} />
        {t.name}
        <button onClick={() => remove(t.id)}>Delete</button></div>
      ))}
    </div>
  );
}`
  }
];

export default function CodePlayground() {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(examples[0]);
  const [showOutput, setShowOutput] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRun = () => {
    setShowOutput(true);
    setIsGenerating(true);
    setDisplayedCode('');
    
    const code = selectedExample.output;
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsGenerating(false);
        clearInterval(interval);
      }
    }, 10); // Adjust speed here (lower = faster)
  };

  const handleExampleChange = (example: CodeExample) => {
    setSelectedExample(example);
    setShowOutput(false);
    setDisplayedCode('');
    setIsGenerating(false);
  };

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <h2 className={styles.title}>Try ***plain</h2>
        <p className={styles.subtitle}>
          Explore different use cases and see how ***plain combines natural language with code precision
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <div className={styles.tabsLeft}>
            {examples.map((example) => (
              <button
                key={example.id}
                className={`${styles.tab} ${selectedExample.id === example.id ? styles.tabActive : ''}`}
                onClick={() => handleExampleChange(example)}
              >
                {example.label}
              </button>
            ))}
          </div>
          <div className={styles.tabsRight}>
            <button className={styles.runButton} onClick={handleRun}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 2l10 6-10 6V2z" />
              </svg>
              Run
            </button>
          </div>
        </div>

        {!showOutput ? (
          <div className={styles.fullWidthView}>
            <div className={styles.fileHeader}>{selectedExample.inputFile}</div>
            <pre className={`${styles.codeBlock} ${styles[selectedExample.codeLanguage]}`}>
              <code dangerouslySetInnerHTML={{ __html: formatPlainCode(selectedExample.code) }} />
            </pre>
          </div>
        ) : (
          <div className={styles.splitView}>
            <div className={styles.leftPanel}>
              <div className={styles.fileHeader}>{selectedExample.inputFile}</div>
              <pre className={`${styles.codeBlock} ${styles[selectedExample.codeLanguage]}`}>
                <code dangerouslySetInnerHTML={{ __html: formatPlainCode(selectedExample.code) }} />
              </pre>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.outputHeader}>
                {selectedExample.outputFile}
                {isGenerating && <span className={styles.generatingIndicator}>Generating...</span>}
              </div>
              <pre className={`${styles.codeBlock} ${selectedExample.id === 'saas' ? styles.python : styles.typescript}`}>
                <code dangerouslySetInnerHTML={{ __html: formatOutputCode(displayedCode, selectedExample.id) }} />
                {isGenerating && <span className={styles.cursor}>|</span>}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
