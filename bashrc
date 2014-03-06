[ -f ~/.pythonrc ] && export PYTHONSTARTUP=~/.pythonrc
[ -f ~/bin/bashmarks.sh ] && . ~/bin/bashmarks.sh

ssh() {
    if [[ -z $TMUX ]]; then
        command ssh $@
        return
    fi
    args=($@)
    wname=${args[${#args[*]} -1]}
    wname=${wname%%.*}
    tmux rename-window $wname
    tmux display "renaming window to $wname"
    command ssh $@
    tmux rename-window bash
}

activate() {
    (( $# < 1 )) && echo "Usage: activate <env>" && return
    _env=$1
    _base=$HOME/.virtualenvs
    if [[ -f ${_base}/${_env}/bin/activate ]]; then
        . ${_base}/${_env}/bin/activate
    else
        echo "${_env}: No such virtualenvs"
    fi
}

cssh_mode() {
    (( $# < 1 )) && { echo "Usage: cssh_mode hostlist" ;} \
                && { tmux set-window-option synchronize-panes off ;} \
                && return
    [[ $1 == "off" ]] && tmux set-window-option synchronize-panes off && return
    [[ $1 == "reset" ]] && tmux set-window-option synchronize-panes off && return
    _percent=$(echo 100/$#|bc)
    for i in "$@"; do 
        tmux -q split-window -d -v -p $_percent "ssh -t $i"
    done
    tmux set-window-option synchronize-panes on
    tmux kill-pane -t 1
}
