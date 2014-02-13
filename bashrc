export PYTHONSTARTUP=~/.pythonrc
[ -f ~/bin/bashmarks.sh ] && . ~/bin/bashmarks.sh
ssh() {
    if [[ -z $TMUX ]]; then
        command ssh $@
        return
    fi
    args=($@)
    tmux rename-window ${args[${#args[*]} -1]}
    tmux display "renaming window to ${args[${#args[*]} -1]}"
    command ssh $@
    tmux rename-window bash
}
