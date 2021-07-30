$(document).ready(() => {
  $('#terminalIcon').removeClass('hidden');
  $('#terminal').draggable({
    handle: '#draggableTerminal',
    opacity: 0.8,
    containment: '#outerContainer',
    scroll: false,
  });

  const prevCommands = [];
  let prevIndex = 0;
  const termInp = $('#terminalInput');
  const commands = [
    {
      name: 'help', fn: () => {
        return `available commands: 
          - help: Displays this help guide
          - cd: Navigate to a directory
          - projects: Gives you a list of all my projects`;
      }
    },
    {
      name: 'cd', fn: () => {
        return 'Error 0xA17XCa981: Not supported yet.'
      }
    },
    {
      name: 'projects', fn: async () => {
        const res = await $.getJSON('https://api.github.com/users/justmedev/repos');
        const out = res.map((repo) => {
          return `${repo.name}: ${repo.description || 'No description provided!'}`;
        })
        return Promise.resolve(`My projects:
        ${out.join('\n')}`);
      },
    }
  ]

  termInp.keyup((event) => {
    // Return key
    if (event.keyCode === 13) {
      console.log(`Command submit: ${$('#terminalInput').val()}`)

      let found = false;
      commands.forEach(async (cmd, i) => {
        if (cmd.name && termInp.val() === cmd.name) {
          found = true;
          const returnVal = await cmd.fn();
          let out = !returnVal.includes('\n') ? returnVal : returnVal.replaceAll('\n', '<br />');
          $('#terminalContent').append(`C:\\Users\\justmedev\\github\\website>${termInp.val()}<br />${out}<br /><br />`);
          termInp.val('');

          prevIndex = 0;
          prevCommands.push(cmd.name);
        } else if (i === (commands.length - 1) && !found) {
          $('#terminalContent').append(`C:\\Users\\justmedev\\github\\website>${termInp.val()}<br />Command '${termInp.val().split(' ')[0]}' doesn't seem to exist :/<br /><br />`);
          termInp.val('');

          prevIndex = 0;
          prevCommands.push(cmd.name);
        }
      });
    }
    //  Arrow up & Arrow down
    else if (event.keyCode === 38) {
      console.log(prevCommands);
      prevIndex = prevIndex === 0 ? 0 : prevIndex - 1;
      termInp.val(prevCommands[prevIndex]);
    } else if (event.keyCode === 40) {
      console.log(prevCommands);
      prevIndex = prevIndex === prevCommands.length - 1 ? prevCommands.length - 1 : prevIndex + 1;
      termInp.val(prevCommands[prevIndex]);
    }
  });
});

function openTerminal() {
  console.log('Opening terminal');
  $('#terminal').removeClass('hidden');
}

function closeTerminal() {
  console.log('Closing terminal');
  $('#terminal').addClass('hidden');
}
