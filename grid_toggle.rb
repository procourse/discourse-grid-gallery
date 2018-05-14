module ::GridViewPlugin

    class GridToggle
        def initialize(target, user)
            # TODO Is this even correct for the usage?
            @target = target
            @user = user
        end

        def set(toggle)
            # TODO Figure out how to set key
            # TODO Logic for setting toggle appropriately
            ::PluginStore.set("grid_view", key, toggle)
        end

        def get()
            # TODO Figure out how to set key
            status = ::PluginStore.get("grid_view", key)
        end
    end
